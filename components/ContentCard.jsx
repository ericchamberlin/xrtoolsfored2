import Link from 'next/link';
import VideoThumbnail from './VideoThumbnail';

export default function ContentCard({ item }) {
  // Determine background color based on content type
  const getBgColor = () => {
    switch(item.contentType) {
      case '360 Video':
        return 'bg-blue-900/20 border-blue-800';
      case 'Immersive Experience':
        return 'bg-purple-900/20 border-purple-800';
      case 'VR App':
        return 'bg-green-900/20 border-green-800';
      default:
        return 'bg-gray-900 border-gray-800';
    }
  };

  // Determine tag background color
  const getTagBgColor = () => {
    switch(item.contentType) {
      case '360 Video':
        return 'bg-blue-800';
      case 'Immersive Experience':
        return 'bg-purple-800';
      case 'VR App':
        return 'bg-green-800';
      default:
        return 'bg-gray-800';
    }
  };

  return (
    <Link href={`/tool/${item.id}`}>
      <div className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border h-full flex flex-col ${getBgColor()}`}>
        <div className="relative">
          <VideoThumbnail 
            src={item.thumbnailUrl} 
            alt={item.title} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3">
            <span className={`text-sm font-medium px-3 py-1.5 rounded-md ${getTagBgColor()} text-white`}>
              {item.contentType}
            </span>
          </div>
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
            {item.description || 'No description available'}
          </p>
          
          <div className="flex flex-wrap gap-1 mt-auto">
            {item.tags && item.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
            {item.tags && item.tags.length > 3 && (
              <span className="text-gray-400 text-xs">+{item.tags.length - 3} more</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}