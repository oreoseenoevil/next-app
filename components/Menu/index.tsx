'use client'

import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'
import './menu.scss'
import { usePathname } from 'next/navigation'

const items = [
  {
    name: 'Home',
    slug: 'home',
    path: '/'
  },
  {
    name: 'Genres',
    slug: 'genres',
    path: '/genres'
  },
  {
    name: 'Authors',
    slug: 'authors',
    path: '/authors'
  }
]

type Item = {
  name: string
  slug: string
  path: string
}

interface MenuItemProps {
  item: Item
  selected: boolean
  onItemSelect: (value: Item) => void
}

const MenuItem = ({ item, selected = false, onItemSelect }: MenuItemProps) => {
  return (
    <Link
      className={`menu-item ${selected ? 'menu-item--selected' : ''}`}
      data-slug={item.slug}
      onClick={() => {
        onItemSelect(item)
      }}
      href={item.slug === 'home' ? '/' : `/${item.slug}`}
    >
      {item.name}
    </Link>
  )
}

const Menu = () => {
  const pathname = usePathname()
  const [selectedItem, setSelectedItem] = useState<Item>()
  const menuItemsRef = useRef<HTMLDivElement>(null)
  const selectedItemRef =
    menuItemsRef.current && selectedItem
      ? menuItemsRef.current.querySelector(`[data-slug=${selectedItem.slug}]`)
      : null

  const calculateDashPosition = (
    element: Element | null,
    dashWidth: number
  ): number => {
    return (
      (element as HTMLDivElement).offsetLeft +
      (element as HTMLDivElement).offsetWidth / 2 -
      dashWidth / 2
    )
  }

  const calculateDashWidth = (element: Element | null): number => {
    return (element as HTMLDivElement).offsetWidth
  }

  const dashWidth = selectedItemRef ? calculateDashWidth(selectedItemRef) : 0

  const dashPosition = selectedItemRef
    ? calculateDashPosition(selectedItemRef, dashWidth)
    : 0

  const selectItem = (item: Item) => {
    setSelectedItem(item)
  }

  useEffect(() => {
    const initialItem = items.find(item => item.path === pathname)
    setSelectedItem(initialItem)
  }, [pathname])

  const renderItems = items.map(item => (
    <MenuItem
      item={item}
      selected={!!selectedItem && selectedItem.slug === item.slug}
      onItemSelect={selectItem}
      key={item.slug}
    />
  ))

  return (
    <div className="menu">
      <div className="menu-items" ref={menuItemsRef}>
        {renderItems}
        <div
          className="menu-pill"
          style={{
            width: dashWidth,
            transform: `translate3d(${dashPosition}px, 0 , 0)`
          }}
        />
      </div>
      <div className="menu-line"></div>
    </div>
  )
}

export default Menu
