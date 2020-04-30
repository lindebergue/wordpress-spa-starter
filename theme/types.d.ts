// Typings for `import`able assets

declare module '*.scss' {
  const content: { [key: string]: string }
  export default content
}

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.mp4' {
  const content: string
  export default content
}

declare module '*.glsl' {
  const content: string
  export default content
}

// Typings for global variables, injected by external scripts
interface Window {
  ga?: (command: string, ...fields: any[]) => void
}
