const Axios = require("axios");
const { Pages } = require("../models");

const axios = Axios.create({ baseURL: "https://graph.facebook.com/v10.0" });

/**
 * Retrieving API token from database
 *  */

const getToken = function (token) {
  return Pages.find({ serverToken: token }).then((docs, error) => {
    if (!error && docs.length > 0) {
      return docs[0];
    } else {
      return console.log(error);
    }
  });
};

/**
 *
 * Service to communicate with facebook API
 */

function getPage(id, accessToken) {
  const query = `?access_token=${accessToken}&fields=id,about,attire,awards,band_interests,bio,birthday,category,category_list,contact_address,current_location,directed_by,emails,features,followers_count,founded,has_whatsapp_number,hometown,influences,is_owned,location,members,mission,name,page_token,phone,preferred_audience,website,whatsapp_number`;
  console.log("/" + id + query);
  return axios
    .get("/" + id + query)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

function getPosts(id, accessToken) {
  const query = `?access_token=${accessToken}`;
  return axios
    .get("/" + id + "/posts" + query)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

function getPhotos(id, accessToken) {
  const query = `?access_token=${accessToken}`;
  return axios
    .get("/" + id + "/photos" + query)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

function subscribeWebHooks(pageId, accessToken) {
  const query = `?access_token=${accessToken}&subscribed_fields=messages,messaging_postbacks,messaging_optins,feed`;
  return axios
    .post(`${pageId}/subscribed_apps` + query)
    .then((response) => response.data);
}

function unsubscribeWebHooks(pageId, accessToken) {
  const query = "?" + [`access_token=` + accessToken].join("&");
  return axios
    .delete(`${pageId}/subscribed_apps` + query)
    .then((response) => response.data);
}

function getPageInsights(id, accessToken) {
  const query = `?metric=page_impressions_unique,page_engaged_users&access_token=${accessToken}`;
  return axios
    .get("/" + id + "/insights" + query)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

function getPostInsights(id, accessToken) {
  const query = `?metric=post_reactions_like_total,post_reactions_love_total,post_reactions_wow_total&access_token=${accessToken}`;
  return axios
    .get("/" + id + "/insights" + query)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

function getVideoInsights(id, accessToken) {
  const query = `?metric=post_video_ad_break_ad_impressions&period=lifetime&access_token=${accessToken}`;
  return axios
    .get("/" + id + "/insights" + query)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

function searchPages(q, accessToken) {
  const query = `?q=${q}&fields=id,name,location,link,verification_status,is_eligible_for_branded_content,is_unclaimed&access_token=${accessToken}`;
  return axios
    .get("/pages/search" + query)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

function getPageFeed(id, accessToken) {
  const query = `?fields=actions,caption,description,feed_targeting,from,is_expired,is_popular,is_published,link,message,story,subscribed,to,type&access_token=${accessToken}`;
  return axios
    .get("/" + id + "/feed" + query)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function getUserProfile(id, accessToken) {
  const query = `?fields=id,about,age_range,birthday,education,email,favorite_athletes,favorite_teams,first_name,gender,hometown,inspirational_people,installed,is_guest_user,languages,last_name,link,location,meeting_for,name,name_format,quotes,relationship_status,token_for_business,website&access_token=${accessToken}`;
  return axios
    .get("/" + id + query)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

function getUserFeed(id, accessToken) {
  const query = `?access_token=${accessToken}`;
  return axios
    .get("/" + id + "/feed" + query)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

function getPostComments(id, accessToken) {
  const query = `?access_token=${accessToken}`;
  return axios
    .get("/" + id + "/comments" + query)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

function getReactions(id, accessToken) {
  const query = `?access_token=${accessToken}`;
  return axios
    .get("/" + id + "/reactions" + query)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

function getPageRatings(id, accessToken) {
  const query = `?access_token=${accessToken}&fields=open_graph_story,created_time,reviewer,has_ratings,has_review,rating,review_text`;
  return axios
    .get("/" + id + "/ratings" + query)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

function getPageLocations(id, accessToken) {
  const query = `?access_token=${accessToken}`;
  return axios
    .get("/" + id + "/locations" + query)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

module.exports = {
  getToken,
  subscribeWebHooks,
  unsubscribeWebHooks,
  getPosts,
  getPhotos,
  getPageInsights,
  getPostInsights,
  getVideoInsights,
  searchPages,
  getPageFeed,
  getUserProfile,
  getUserFeed,
  getPostComments,
  getReactions,
  getPage,
  getPageRatings,
  getPageLocations,
};
