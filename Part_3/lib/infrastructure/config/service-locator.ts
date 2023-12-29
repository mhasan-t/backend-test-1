import constants from "./constants";
import environment from "./environment";

// Types
import PasswordManager from "../../domain/services/PasswordManager";
import AccessTokenManager from "../../application/security/AccessTokenManager";

import Serializer from "../../interfaces/serializers/Serializer";

import UserRepository from "../../domain/repositories/UserRepository";
import PostRepository from "../../domain/repositories/PostRepository";
import User_PostRepository from "../../domain/repositories/User_PostRepository";

// Implementations

import BcryptPasswordManager from "../security/BcryptPasswordManager";
import JwtAccessTokenManager from "../security/JwtAccessTokenManager";

import UserSerializer from "../../interfaces/serializers/UserSerializer";
import PostSerializer from "../../interfaces/serializers/PostSerializer";
import User_PostSerializer from "../../interfaces/serializers/User_Post";

// Mongo
import UserRepositoryMongo from "../repositories/mongoose/UserRepositoryMongo";
import PostRepositoryMongo from "../repositories/mongoose/PostRepositoryMongo";
import User_PostRepositoryMongo from "../repositories/mongoose/User_PostRepositoryMongo";

export type ServiceLocator = {
	passwordManager: PasswordManager;
	accessTokenManager: AccessTokenManager;

	userSerializer: Serializer;
	userRepository?: UserRepository;

	postSerializer: Serializer;
	postRepository?: PostRepository;

	userPostSerializer: Serializer;
	userPostRepository?: User_PostRepository;
};

function buildBeans() {
	const beans: ServiceLocator = {
		passwordManager: new BcryptPasswordManager(),
		accessTokenManager: new JwtAccessTokenManager(),

		userSerializer: new UserSerializer(),
		postSerializer: new PostSerializer(),
		userPostSerializer: new User_PostSerializer(),
	};

	if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
		beans.userRepository = new UserRepositoryMongo();
		beans.postRepository = new PostRepositoryMongo();
		beans.userPostRepository = new User_PostRepositoryMongo();
	}

	return beans;
}

export default buildBeans();
