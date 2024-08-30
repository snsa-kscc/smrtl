export function CallToAction({
  call,
  additionalText,
  buttonText,
  buttonLink,
}: {
  call: string
  additionalText: string
  buttonText: string
  buttonLink: string
}) {
  return (
    <div>
      <h2>{call}</h2>
      <p>{additionalText}</p>
      <p>{buttonText}</p>
      <p>{buttonLink}</p>
    </div>
  )
}
