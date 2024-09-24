import Image from 'next/image';
import React from 'react';

const NewImageComponent = (props: any) => {
  const {
    aspectRatio,
    objectFit,
    src,
    alt,
    priority = false,
    type,
    width,
    height,
    className,
    style = {},
  } = props;
  return (
    <>
      {type === 1 ? (
        <div
          className="position-relative"
          style={{
            aspectRatio: aspectRatio,
            objectFit: objectFit,
            ...style,
          }}
        >
          <Image
            src={src}
            fill
            alt={alt}
            unoptimized={false}
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            className={className}
          />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          unoptimized={false}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          width={width}
          height={height}
          sizes="100vw"
          className={className}
        />
      )}
    </>
  );
};

export default NewImageComponent;
