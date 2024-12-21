// src/components/NotebookUI/types.ts

export interface NotebookTab {
    id: string;
    title: string;
    icon?: React.ReactNode;
  }
  
  export interface NavbarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
    notebooks: NotebookTab[];
    activeTab: string;
    setActiveTab: (tabId: string) => void;
  }
  
  export interface SidebarProps {
    isOpen: boolean;
  }
  
  export interface NotebookProps {
    activeTab: string;
  }