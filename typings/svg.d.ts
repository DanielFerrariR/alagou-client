declare module '*.svg' {
  interface Props {
    width?: number
    height?: number
  }

  const content: React.FC<Props>

  export default content
}
