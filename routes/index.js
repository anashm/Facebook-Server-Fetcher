const Router = require("express").Router;
const router = new Router();
const facebook = require("../controllers");

/**
 * Fetching users related data
 */

router.get("/user/:userId/pictures", facebook.getUserPictures);

router.get("/user/:userId/profile", facebook.getUserProfile);

router.get("/user/:userId/feed", facebook.getUserFeed);

router.get("/user/:userId/post/:postId/comments", facebook.getUserPostComments);

/**
 * Fetching pages related data
 */

router.get("/page/:pageId", facebook.getPage);

router.get("/page/:pageId/posts", facebook.getPagePosts);

router.get("/page/:pageId/insights", facebook.getPageInsights);

router.get("/post/:postId/insights", facebook.getPostInsights);

router.get("/video/:postId/insights", facebook.getVideoInsights);

router.get("/pages/search/:query", facebook.searchPages);

router.get("/page/:pageId/feed", facebook.getPageFeed);

router.get("/post/:postId/comments", facebook.getPagePostComments);

router.get("/post/:postId/reactions", facebook.getPostReactions);

router.get("/comment/:commentId/reactions", facebook.getCommentReactions);

router.get("/page/:pageId/ratings", facebook.getPageRatings);

router.get("/page/:pageId/locations", facebook.getPageLocations);

module.exports = router;
