import { Router } from 'express';
import * as ReviewsController from './reviews.controller';

const router = Router();
router
    .route('/reviews')
    .get(ReviewsController.getReviews);
router
    .route('/reviewsByUsername/:username')
    .get(ReviewsController.getReviewsByUsername);
router
    .route('/reviewsByUserId/:userId')
    .get(ReviewsController.getReviewsByUserId);
router
    .route('/createReview')
    .post(ReviewsController.createReview);
router
    .route('/deleteReview/:id')
    .delete(ReviewsController.deleteReview);

export default router;