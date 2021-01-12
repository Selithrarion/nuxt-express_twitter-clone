import cloudinary from '../core/cloudinary';

class UploadFileController {
	async upload(req, res): Promise<void> {
		const file = req.file;

		cloudinary.v2.uploader
			.upload_stream(
				{ resource_type: 'auto', folder: 'twitter-clone' },
				(error, result) => {
					if (error || !result) {
						return res.status(500).json({
							status: 'error',
							message: error || 'upload error',
						});
					}
					res.json({
						url: result.url,
						size: result.bytes / 1024,
						height: result.height,
						width: result.width,
					});
				}
			)
			.end(file.buffer);
	}
}

export const UploadFileCtrl = new UploadFileController();
