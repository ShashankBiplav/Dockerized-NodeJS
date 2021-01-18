export const exampleController = (req, res, next) => {
  res.status(200).json({
    message: "Docker is so awesome!😃"
  });
};

export const uploadImage = (req, res, next) => {
  const imageUrl = req.file.path;
    res.status(201).json({
      message: "Image uploaded successfully. View your image using this image url with your dockerized app base url",
      imageUrl: `${imageUrl}`
    });
};
