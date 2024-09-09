export function Archive({ populateBy, relationTo, limit, selectedDocs }: any) {
  return (
    <div>
      <p>{populateBy}</p>
      <p>{relationTo}</p>
      <p>{limit}</p>
      <p>{selectedDocs}</p>
    </div>
  )
}
