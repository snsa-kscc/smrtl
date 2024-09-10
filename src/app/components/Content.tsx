import { serializeLexical } from '../lib/serialize'

export function Content({ content }: { content: any }) {
  return (
    <div>
      <div className="richText">{serializeLexical({ nodes: content.root.children })}</div>
    </div>
  )
}
