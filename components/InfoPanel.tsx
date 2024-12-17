import { Node, Edge } from 'reactflow';
import { elementDescriptions } from '@/lib/elementDescriptions';

interface InfoPanelProps {
  selectedElement: { type: 'node' | 'edge', data: Node | Edge } | null;
}

export default function InfoPanel({ selectedElement }: InfoPanelProps) {
  if (!selectedElement) {
    return (
      <div className="w-1/4 p-6 border-l border-gray-200 bg-gray-50">
        <div className="flex items-center justify-center h-full text-center">
          <p className="text-gray-500">
            Select an element to view its details
          </p>
        </div>
      </div>
    );
  }

  const elementId = selectedElement.data.id;
  const elementType = selectedElement.type;
  const description = elementType === 'node' 
    ? elementDescriptions.nodes[elementId]
    : elementDescriptions.edges[elementId];

  if (!description) {
    return (
      <div className="w-1/4 p-6 border-l border-gray-200 bg-gray-50">
        <div className="flex items-center justify-center h-full text-center">
          <p className="text-gray-500">
            No description available for {elementId}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-1/4 border-l border-gray-200 bg-gray-50 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          {elementType}
        </span>
        <h2 className="text-2xl font-semibold text-gray-900 mt-1">
          {description.title}
        </h2>
      </div>
      
      <div className="p-6">
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed">
            {description.description}
          </p>
          
          {/* Additional sections can be added here */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-3">
              Technical Details
            </h3>
            <p className="text-gray-600 text-sm">
              ID: {elementId}
              {/* Add more technical details as needed */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}