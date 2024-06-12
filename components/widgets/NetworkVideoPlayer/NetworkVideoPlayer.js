import css from "./NetworkVideoPlayer.module.css";

const NetworkVideoPlayer = ({ url }) => {
  return (
    <div className={css.container}>
      <video controls className={css.video}>
        <source type="video/mp4" src={`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${url}`} />
      </video>
    </div>
  );
};

export default NetworkVideoPlayer;
