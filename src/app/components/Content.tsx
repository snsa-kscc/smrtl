import { serializeLexical } from '../lib/serialize'

export function Content({ content }: { content: any }) {
  return (
    <div className="mx-auto w-1/2 py-16">
      <div className="richText">{serializeLexical({ nodes: content.root.children })}</div>
    </div>
  )
}
