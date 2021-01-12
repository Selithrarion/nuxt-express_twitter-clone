import { Router } from 'express';
import multer from 'multer';
import { UploadFileCtrl } from '../controllers/UploadFileController';
const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), UploadFileCtrl.upload);

export const UploadRoute = router;
