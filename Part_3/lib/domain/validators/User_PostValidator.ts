import Joi from "joi";

export default Joi.object({
	userId: Joi.string().label("content").min(1).required(),
	postId: Joi.string().label("content").min(1).required(),
}).unknown();
