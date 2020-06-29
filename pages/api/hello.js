// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// use api routes for for some server side processing not for serving pages

export default (req, res) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
