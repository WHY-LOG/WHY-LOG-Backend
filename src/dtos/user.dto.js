export const bodyToUser = (body) => {

  return {
    name: body.name,
    email: body.email,  
    imgUrl: body.imgUrl || "",
  };
};

export const responseFromUser = (body) => {
  return {
    userId: body.id,
    name: body.name,
    email: body.email, 
    imgUrl: body.imgUrl || "",
  }
}