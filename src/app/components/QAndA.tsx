export function QAndA({
  title,
  subtitle,
  qAndABox,
}: {
  title: string
  subtitle: string
  qAndABox: { question: string; answer: string }[]
}) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <div>
        {qAndABox.map((question, index) => (
          <div key={index}>
            <h3>{question.question}</h3>
            <p>{question.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
