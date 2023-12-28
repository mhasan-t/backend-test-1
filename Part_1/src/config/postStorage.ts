import multer from "multer";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "images/");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			(
				file.fieldname +
				"-" +
				uniqueSuffix +
				"-" +
				file.originalname
			).replace(/ /g, "_")
		);
	},
});

function filter(req: object, file: Express.Multer.File, cb: Function) {
	cb(null, file.mimetype === "image/jpg" || file.mimetype === "image/jpeg");
}

const postStorage = multer({
	storage: storage,
	fileFilter: filter,
	limits: {
		fileSize: 1024 * 1024, // max size in bytes
	},
});

export default postStorage;
