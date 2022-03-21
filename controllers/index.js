const FB = require("../service");
const { Users, Pages } = require("../models");

/**
 *
 *  Routes callbacks implementation
 */

exports.getPage = (req, res) => {
  const { pageId } = req.params;
  const { token } = req.headers;

  return FB.getToken(token)
    .then((page) => {
      console.log("Token from db :::::::::::::::::: ", page.token);
      return FB.getPage(pageId, page.token)
        .then((profile) => {
          console.log("RESPONSE ==================================> ", profile);
          return res.status(200).json(profile);
        })
        .catch((error) =>
          res.status(500).json({ error: `An error ocured ${error}` })
        );
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          message: "Token not valid or user not authorized",
          reason: error.message,
        },
      });
    });
};

exports.getPagePosts = (req, res) => {
  const { pageId } = req.params;
  const { token } = req.headers;

  return FB.getToken(token)
    .then((page) => {
      // console.log(page.token);
      return FB.getPosts(pageId, page.token)
        .then((posts) => {
          res.status(200).json({
            posts,
          });
        })
        .catch((error) => {
          return res.status(500).json({ error: `An error occured ${error}` });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          message: "Token not valid or user not authorized",
          reason: error.message,
        },
      });
    });
};

exports.getUserPictures = (req, res) => {
  const { userId } = req.params;
  const { token } = req.headers;
  console.log("Token from request : : ", token);

  return FB.getToken(token)
    .then((page) => {
      console.log("Got token =========== ", page);
      Pages.findById(userId).then((user) => {
        if (!user) {
          throw new Error("Page not found");
        }

        return FB.getPhotos(userId, user.token)
          .then((pictures) => {
            res.status(200).json({ pictures });
          })
          .catch((error) => {
            return res
              .status(500)
              .json({ error: `An error occured : ${error}` });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          message: "Token not valid or user not authorized",
          reason: error.message,
        },
      });
    });
};

exports.getPageInsights = (req, res) => {
  const { pageId } = req.params;
  const { token } = req.headers;

  return FB.getToken(token)
    .then((page) => {
      return FB.getPageInsights(pageId, page.token)
        .then((insights) => {
          res.status(200).json({ insights });
        })
        .catch((error) => {
          return res.status(500).json({ error: `An error occured : ${error}` });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          message: "Token not valid or user not authorized",
          reason: error.message,
        },
      });
    });
};

exports.getPostInsights = (req, res) => {
  const { postId } = req.params;
  const { token } = req.headers;

  return FB.getToken(token)
    .then((page) => {
      return FB.getPostInsights(postId, page.token)
        .then((insights) => {
          res.status(200).json({ insights });
        })
        .catch((error) => {
          return res.status(500).json({ error: `An error occured : ${error}` });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          message: "Token not valid or user not authorized",
          reason: error.message,
        },
      });
    });
};

exports.getVideoInsights = (req, res) => {
  const { postId } = req.params;
  const { token } = req.headers;

  return FB.getToken(token)
    .then((page) => {
      return FB.getVideoInsights(postId, page.token)
        .then((insights) => {
          res.status(200).json({ insights });
        })
        .catch((error) => {
          return res.status(500).json({ error: `An error occured : ${error}` });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          message: "Token not valid or user not authorized",
          reason: error.message,
        },
      });
    });
};

exports.searchPages = (req, res) => {
  const { query } = req.params;
  const { token } = req.headers;

  return FB.getToken(token)
    .then((page) => {
      return FB.searchPages(query, page.token)
        .then((pages) => {
          res.status(200).json({ pages });
        })
        .catch((error) => {
          return res.status(500).json({ error: `An error occured : ${error}` });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          message: "Token not valid or user not authorized",
          reason: error.message,
        },
      });
    });
};

exports.getPageFeed = (req, res) => {
  const { pageId } = req.params;
  const { token } = req.headers;

  return FB.getToken(token)
    .then((page) => {
      return FB.getPageFeed(pageId, page.token)
        .then((feed) => {
          res.status(200).json({ feed });
        })
        .catch((error) => {
          return res.status(500).json({ error: `An error occured : ${error}` });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          message: "Token not valid or user not authorized",
          reason: error.message,
        },
      });
    });
};

exports.getUserProfile = (req, res) => {
  const { userId } = req.params;
  const { token } = req.headers;

  return FB.getToken(token)
    .then((page) => {
      return FB.getUserProfile(userId, page.token)
        .then((user) => {
          res.status(200).json({ user });
        })
        .catch((error) => {
          return res.status(500).json({ error: `An error occured : ${error}` });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          message: "Token not valid or user not authorized",
          reason: error.message,
        },
      });
    });
};

exports.getUserFeed = (req, res) => {
  const { userId } = req.params;
  const { token } = req.headers;

  return FB.getToken(token)
    .then((page) => {
      Users.findById(userId).then((result) => {
        if (!result) {
          throw Error("Page not found");
        }
        return FB.getUserFeed(userId, result.token)
          .then((user) => {
            res.status(200).json({ user });
          })
          .catch((error) => {
            return res
              .status(500)
              .json({ error: `An error occured : ${error}` });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          message: "Token not valid or user not authorized",
          reason: error.message,
        },
      });
    });
};

exports.getPagePostComments = (req, res) => {
  const { postId } = req.params;
  const { token } = req.headers;

  return FB.getToken(token)
    .then((page) => {
      return FB.getPostComments(postId, page.token)
        .then((comments) => {
          res.status(200).json({ comments });
        })
        .catch((error) => {
          return res.status(500).json({ error: `An error occured : ${error}` });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          message: "Token not valid or user not authorized",
          reason: error.message,
        },
      });
    });
};

exports.getUserPostComments = (req, res) => {
  const { userId, postId } = req.params;
  const { token } = req.headers;

  return FB.getToken(token)
    .then((page) => {
      Users.findById(userId).then((user) => {
        if (!user) {
          throw Error("Page not found");
        }
        return FB.getPostComments(postId, user.token)
          .then((comments) => {
            res.status(200).json({ comments });
          })
          .catch((error) => {
            return res
              .status(500)
              .json({ error: `An error occured : ${error}` });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          message: "Token not valid or user not authorized",
          reason: error.message,
        },
      });
    });
};

exports.getPostReactions = (req, res) => {
  const { postId } = req.params;
  const { token } = req.headers;

  return FB.getToken(token)
    .then((page) => {
      return FB.getReactions(postId, page.token)
        .then((reactions) => {
          res.status(200).json({ reactions });
        })
        .catch((error) => {
          return res.status(500).json({ error: `An error occured : ${error}` });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          message: "Token not valid or user not authorized",
          reason: error.message,
        },
      });
    });
};

exports.getCommentReactions = (req, res) => {
  const { commentId } = req.params;
  const { token } = req.headers;

  return FB.getToken(token)
    .then((page) => {
      return FB.getReactions(commentId, page.token)
        .then((reactions) => {
          res.status(200).json({ reactions });
        })
        .catch((error) => {
          return res.status(500).json({ error: `An error occured : ${error}` });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          message: "Token not valid or user not authorized",
          reason: error.message,
        },
      });
    });
};

exports.getPageRatings = (req, res) => {
  const { pageId } = req.params;
  const { token } = req.headers;

  return FB.getToken(token)
    .then((page) => {
      return FB.getPageRatings(pageId, page.token)
        .then((ratings) => {
          res.status(200).json({
            ratings,
          });
        })
        .catch((error) => {
          return res.status(500).json({ error: `An error occured ${error}` });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          message: "Token not valid or user not authorized",
          reason: error.message,
        },
      });
    });
};

exports.getPageLocations = (req, res) => {
  const { pageId } = req.params;
  const { token } = req.headers;

  return FB.getToken(token)
    .then((page) => {
      return FB.getPageLocations(pageId, page.token)
        .then((locations) => {
          res.status(200).json({
            locations,
          });
        })
        .catch((error) => {
          return res.status(500).json({ error: `An error occured ${error}` });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          message: "Token not valid or user not authorized",
          reason: error.message,
        },
      });
    });
};
