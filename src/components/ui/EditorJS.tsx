
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface EditorJSProps {
  initialData?: any;
  onChange?: (data: any) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

const EditorJS: React.FC<EditorJSProps> = ({
  initialData,
  onChange,
  placeholder = 'Start writing...',
  readOnly = false,
  className
}) => {
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const initEditor = async () => {
      try {
        // In a real implementation, we would dynamically import EditorJS and its plugins
        // For now, we'll simulate the editor's appearance
        setIsLoaded(true);
        
        // In a real implementation, this would initialize EditorJS
        // const EditorJS = (await import('@editorjs/editorjs')).default;
        // const editor = new EditorJS({
        //   holder: editorRef.current,
        //   data: initialData || {},
        //   placeholder,
        //   readOnly,
        //   onChange: async () => {
        //     const content = await editor.save();
        //     onChange?.(content);
        //   },
        //   tools: {
        //     // EditorJS plugins would be configured here
        //   }
        // });
        // setEditorInstance(editor);
      } catch (error) {
        console.error('Error initializing editor:', error);
      }
    };

    initEditor();

    return () => {
      // In a real implementation:
      // editorInstance?.destroy();
    };
  }, []);

  return (
    <div className={cn("w-full border rounded-lg overflow-hidden bg-white", className)}>
      {!isLoaded ? (
        <div className="p-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="bg-gray-50 border-b px-3 py-2 flex items-center gap-2">
            <button className="p-1 rounded hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button className="p-1 rounded hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </button>
            <button className="p-1 rounded hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <path d="M10 12h2v6"></path>
                <rect x="2" y="12" width="4" height="6"></rect>
              </svg>
            </button>
            <button className="p-1 rounded hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </button>
            <button className="p-1 rounded hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
            </button>
          </div>
          <div 
            ref={editorRef} 
            className="px-4 py-3 min-h-[200px] prose prose-sm max-w-none"
          >
            <p className="text-gray-400">{placeholder}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorJS;
