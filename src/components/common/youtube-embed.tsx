const YoutubeEmbed = (props: any) => {
  return (
    props?.url && (
      <div className="mt-0 mt-md-2">
        <div className="row justify-content-between">
          <div className="col">
            <div className="d-flex video-responsive">
              <iframe
                src={props?.url}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default YoutubeEmbed;
