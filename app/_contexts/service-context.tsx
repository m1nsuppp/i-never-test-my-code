'use client';

import { type ArticlesService } from '@/usecases/articles-service';
import { createContext } from 'react';

export const ServiceContext = createContext<
  | {
      articlesService: ArticlesService;
    }
  | undefined
>(undefined);

ServiceContext.displayName = 'ServiceContext';
