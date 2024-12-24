import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import {useState, useEffect} from 'react'
import TabCard from '../TabCard'
import './index.css'

const Tablets = props => {
  const {tabList, updatedCartCount} = props
  const [activeTab, setActiveTab] = useState(
    tabList.length > 0 ? tabList[0].menuCategory : null,
  )

  useEffect(() => {
    if (tabList.length > 0) {
      setActiveTab(tabList[0].menuCategory)
    }
  }, [tabList])

  const groupedTabs = tabList.reduce((acc, tab) => {
    if (!acc[tab.menuCategory]) {
      acc[tab.menuCategory] = []
    }
    acc[tab.menuCategory].push(tab)
    return acc
  }, {})

  const handleTabSelect = selectedTab => {
    setActiveTab(selectedTab)
    console.log(activeTab)
  }

  return (
    <ul className="unordered-container">
      {tabList.length > 0 ? (
        <Tabs
          activeKey={activeTab}
          onSelect={handleTabSelect}
          id="uncontrolled-tab-example"
          className="mb-3"
          justify
        >
          {Object.keys(groupedTabs).map(category => (
            <Tab key={category} eventKey={category} title={category}>
              <TabCard
                updatedCartCount={updatedCartCount}
                tabList={groupedTabs[category]}
              />
            </Tab>
          ))}
        </Tabs>
      ) : (
        <div>No category</div>
      )}
    </ul>
  )
}

export default Tablets
