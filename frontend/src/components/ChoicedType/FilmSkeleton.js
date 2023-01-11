import React from 'react';
import ContentLoader from 'react-content-loader';

const FilmSkeleton = (props) => (
  <ContentLoader
    className="film_box"
    speed={1}
    width={300}
    height={200}
    viewBox="0 0 1620 1080"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="0" rx="120" ry="120" width="1920" height="1080" />
  </ContentLoader>
);

export default FilmSkeleton;
