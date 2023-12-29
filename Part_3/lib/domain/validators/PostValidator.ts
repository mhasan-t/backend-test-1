import Joi from "joi";

export default Joi.object({
	content: Joi.string().label("content").min(2).max(2000).required(),
}).unknown();
