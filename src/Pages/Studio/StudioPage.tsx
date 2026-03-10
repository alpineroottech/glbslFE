import { Studio } from 'sanity'
// Import the Sanity Studio config from the glbslCMS directory
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore – glbslCMS has its own tsconfig; Vite bundles this correctly
import studioConfig from '../../../glbslCMS/sanity.config'

export default function StudioPage() {
  return (
    <div style={{ height: '100vh' }}>
      <Studio config={studioConfig} />
    </div>
  )
}
