// movies images list for animated header card
export const moviePostersList = (item: any) => {
  let uri = null;
  if (item.posterimageurl && item.posterimageurl != null) {
    uri = item.posterimageurl;
  } else if (item.posterimage == null || item.posterimage == "") {
    uri = item.movieimage;
  } else {
    uri = "https://image.tmdb.org/t/p/w780/" + item.posterimage;
  }

  return uri;
}