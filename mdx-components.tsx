// mdx-components.tsx
import type { MDXComponents } from 'mdx/types'
import 'prismjs/themes/prism-tomorrow.css' // or any other theme

export function useMDXComponents(components: MDXComponents) {
    return {
        // ... other components
        pre: ({ children } : { children : string }) => (
            <pre className="language-jsx p-4 rounded-lg overflow-x-auto">
        {children}
      </pre>
        ),
        code: ({ children, className } : { children : string, className : string }) => {
            // Extract language from className
            const language = className?.replace('language-', '') || 'jsx'

            return (
                <code
                    className={`language-${language}`}
                    data-language={language}
                >
                    {children}
                </code>
            )
        },
        ...components
    }
}

export default useMDXComponents