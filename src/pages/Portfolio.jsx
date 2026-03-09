import { useState } from 'react'
import PortfolioRow from '../components/PortfolioRow'
import SectionHeader from '../components/SectionHeader'
import ImageModal from '../components/ImageModal'
import { portfolioItems } from '../data/portfolio'

function Portfolio() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [category, setCategory] = useState('Website')

  const categories = [
    { label: 'Website Buildouts', value: 'Website' },
    { label: 'Automation Buildouts', value: 'Automation' },
  ]

  const filteredItems = portfolioItems.filter((item) => 
    category === 'Website' 
      ? item.type === 'Website' 
      : item.type === 'Automation' || item.type === 'AI Automation'
  )

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Portfolio"
        subtitle="Selected builds, automations, and interface work."
      />

      {/* Category Tabs */}
      <div className="flex gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${category === cat.value ? 'bg-navy-600 text-white' : 'bg-navy-800 text-navy-200 hover:bg-navy-700'}`}
            onClick={() => setCategory(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredItems.map((project) => (
          <PortfolioRow
            key={project.id}
            project={project}
            onImageClick={() => setSelectedImage(project.image)}
          />
        ))}
        {filteredItems.length === 0 && (
          <div className="text-center text-navy-200 py-8">No projects in this category yet.</div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        src={selectedImage}
        alt="Portfolio project screenshot"
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  )
}

export default Portfolio
