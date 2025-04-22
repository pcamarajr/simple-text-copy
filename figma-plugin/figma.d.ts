// Minimal type definitions for Figma Plugin API
declare const figma: PluginAPI
declare const __html__: string

interface PluginAPI {
  readonly apiVersion: "1.0.0"
  readonly command: string
  readonly viewport: ViewportAPI
  readonly root: DocumentNode
  readonly currentPage: PageNode
  readonly on: (event: "selectionchange" | "currentpagechange" | "close" | "drop", callback: () => void) => void
  readonly closePlugin: (message?: string) => void
  readonly notify: (message: string, options?: NotificationOptions) => NotificationHandler
  readonly showUI: (html: string, options?: ShowUIOptions) => void
  readonly ui: UIAPI
}

interface UIAPI {
  readonly show: () => void
  readonly hide: () => void
  readonly resize: (width: number, height: number) => void
  readonly close: () => void
  readonly postMessage: (pluginMessage: any) => void
  onmessage: (pluginMessage: any) => void
}

interface ShowUIOptions {
  visible?: boolean
  width?: number
  height?: number
  position?: { x: number; y: number }
}

interface Rect {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
}

interface ViewportAPI {
  readonly center: { x: number; y: number }
  readonly zoom: number
  readonly scrollAndZoomIntoView: (nodes: ReadonlyArray<BaseNode>) => void
  readonly bounds: Rect
}

interface DocumentNode extends BaseNode {
  readonly type: "DOCUMENT"
  readonly children: ReadonlyArray<PageNode>
}

interface PageNode extends BaseNode {
  readonly type: "PAGE"
  readonly children: ReadonlyArray<SceneNode>
  readonly selection: ReadonlyArray<SceneNode>
}

interface BaseNode {
  readonly id: string
  readonly parent: (BaseNode & ChildrenMixin) | null
  readonly name: string
  readonly removed: boolean
  readonly type: NodeType
}

interface SceneNode extends BaseNode {
  readonly visible: boolean
  readonly locked: boolean
}

interface TextNode extends SceneNode {
  readonly type: "TEXT"
  characters: string
  readonly fontSize: number
  readonly fontName: FontName
  readonly textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED"
  readonly textAlignVertical: "TOP" | "CENTER" | "BOTTOM"
  readonly textAutoResize: "NONE" | "WIDTH_AND_HEIGHT" | "HEIGHT"
  readonly textCase: "ORIGINAL" | "UPPER" | "LOWER" | "TITLE"
  readonly textDecoration: "NONE" | "UNDERLINE" | "STRIKETHROUGH"
  readonly letterSpacing: LetterSpacing
  readonly lineHeight: LineHeight
}

interface ChildrenMixin {
  readonly children: ReadonlyArray<SceneNode>
}

interface LetterSpacing {
  readonly value: number
  readonly unit: "PIXELS" | "PERCENT"
}

interface LineHeight {
  readonly value: number
  readonly unit: "PIXELS" | "PERCENT" | "AUTO"
}

interface FontName {
  readonly family: string
  readonly style: string
}

type NodeType = 
  | "DOCUMENT"
  | "PAGE"
  | "SLICE"
  | "FRAME"
  | "GROUP"
  | "COMPONENT"
  | "COMPONENT_SET"
  | "INSTANCE"
  | "BOOLEAN_OPERATION"
  | "VECTOR"
  | "STAR"
  | "LINE"
  | "ELLIPSE"
  | "POLYGON"
  | "RECTANGLE"
  | "TEXT"

interface NotificationOptions {
  timeout?: number
  error?: boolean
}

interface NotificationHandler {
  cancel: () => void
} 