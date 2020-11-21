export default function handler(req, res) {
  const {
    query: { pid },
  } = req
  //   const {
  //     query: { pid },
  //   } = req

  //   res.end(`Post: ${pid}`)
  res.json({ id: { pid } })
}
