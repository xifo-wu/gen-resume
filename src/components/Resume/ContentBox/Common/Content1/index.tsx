import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface Content1Props {
  children: string;
}
/**
 * Content1 内容组件只展示内容
 * 支持 MarkDown 格式
 */
const Content1 = ({ children }: Content1Props) => {
  return <ReactMarkdown rehypePlugins={[rehypeRaw]}>{children}</ReactMarkdown>;
};

export default Content1;
