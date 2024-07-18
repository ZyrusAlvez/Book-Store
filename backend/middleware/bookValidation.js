export default function bookValidation (request, response, next){
  if (!request.body.title || !request.body.publishYear){
    response.status(400).send({message: 'require title and publish year'}) 
  }
  next()
}