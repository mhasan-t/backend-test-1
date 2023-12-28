interface Post {
	reference: string;
	title: string;
	description: string;
	main_image: string;
	additional_images?: string[];
	date_time: number;
	title_slug?: string;
	date_time_iso?: string;
}
export default Post;
