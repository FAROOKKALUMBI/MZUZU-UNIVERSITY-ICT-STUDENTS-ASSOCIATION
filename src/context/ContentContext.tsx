import React, { createContext, useContext, useState, useEffect } from 'react';
import { UpdateItem, ResourceItem, ExecutiveMember } from '../types';
import { topUpdates as initialUpdates } from '../data/updates';
import { academicResources as initialResources } from '../data/resources';
import { executiveMembers as initialExecutives } from '../data/executives';

interface ContentContextType {
  updates: UpdateItem[];
  resources: ResourceItem[];
  executives: ExecutiveMember[];
  addUpdate: (item: Omit<UpdateItem, 'id' | 'number'>) => void;
  editUpdate: (id: string, item: Partial<UpdateItem>) => void;
  deleteUpdate: (id: string) => void;
  addResource: (item: Omit<ResourceItem, 'id'>) => void;
  deleteResource: (id: string) => void;
  editExecutive: (id: string, member: Partial<ExecutiveMember>) => void;
  resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEYS = {
  UPDATES: 'muisa_content_updates',
  RESOURCES: 'muisa_content_resources',
  EXECUTIVES: 'muisa_content_executives',
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [updates, setUpdates] = useState<UpdateItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.UPDATES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved updates', e);
      }
    }
    return initialUpdates;
  });

  const [resources, setResources] = useState<ResourceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RESOURCES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved resources', e);
      }
    }
    return initialResources;
  });

  const [executives, setExecutives] = useState<ExecutiveMember[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXECUTIVES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved executives', e);
      }
    }
    return initialExecutives;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.UPDATES, JSON.stringify(updates));
  }, [updates]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXECUTIVES, JSON.stringify(executives));
  }, [executives]);

  const addUpdate = (item: Omit<UpdateItem, 'id' | 'number'>) => {
    const newId = String(Date.now());
    const nextNum = String(updates.length + 1).padStart(2, '0');
    const newUpdate: UpdateItem = {
      ...item,
      id: newId,
      number: nextNum,
    };
    setUpdates([newUpdate, ...updates]);
  };

  const editUpdate = (id: string, updatedFields: Partial<UpdateItem>) => {
    setUpdates((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteUpdate = (id: string) => {
    setUpdates((prev) => prev.filter((item) => item.id !== id));
  };

  const addResource = (item: Omit<ResourceItem, 'id'>) => {
    const newResource: ResourceItem = {
      ...item,
      id: `res-${Date.now()}`,
    };
    setResources([newResource, ...resources]);
  };

  const deleteResource = (id: string) => {
    setResources((prev) => prev.filter((item) => item.id !== id));
  };

  const editExecutive = (id: string, updatedFields: Partial<ExecutiveMember>) => {
    setExecutives((prev) =>
      prev.map((exec) => (exec.id === id ? { ...exec, ...updatedFields } : exec))
    );
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.UPDATES);
    localStorage.removeItem(STORAGE_KEYS.RESOURCES);
    localStorage.removeItem(STORAGE_KEYS.EXECUTIVES);
    setUpdates(initialUpdates);
    setResources(initialResources);
    setExecutives(initialExecutives);
  };

  return (
    <ContentContext.Provider
      value={{
        updates,
        resources,
        executives,
        addUpdate,
        editUpdate,
        deleteUpdate,
        addResource,
        deleteResource,
        editExecutive,
        resetToDefaults,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
