import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext
} from 'react';

import * as paintingApi from '../api/paintings';

export const PaintingContext = createContext();
export const usePaintings = () => useContext(PaintingContext);

export const PaintingProvider = ({
    children
  }) => {
    const [paintings, setPaintings] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [currentPainting, setCurrentPainting] = useState({});
    const [painting, setPainting] = useState([]);

    const getPaintingById = useCallback(async (id) => {
      try {
        setError();
        setLoading(true);
        const data = await paintingApi.getPaintingById(id);
        setPainting(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }, []);

    const refreshPaintings = useCallback(async () => {
      try {
        setError();
        setLoading(true);
        const data = await paintingApi.getAllPaintings();
        setPaintings(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }, []);
    

    useEffect(() => {
      if (paintings?.length === 0) {
        refreshPaintings();
      }
    }, [paintings, refreshPaintings]);

    const createOrUpdatePainting = useCallback(async ({
      id,
      name,
      type,
      price,
      size,
      description,
      img
    }) => {
      setError();
      setLoading(true);
      
      try {
        await paintingApi.savePainting({
          id,
          name,
          type,
          price,
          size,
          description,
          img
        });
        await refreshPaintings();
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
          setLoading(false);      
      }
    }, [refreshPaintings]);

    const deletePainting = useCallback(async (id) => {
      try {
        setError();
        setLoading(true);
        await paintingApi.deletePainting(id);
        refreshPaintings();
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setLoading(false);
      }
    }, [refreshPaintings]);

    const setPaintingToUpdate = useCallback((id) => {
      setCurrentPainting(id === null ? {} : paintings.find((t) => t.id === id));
    }, [paintings]);
  
    const value = useMemo(() => ({
        paintings,
        error,
        loading,
        currentPainting,
        painting,
        getPaintingById,
        createOrUpdatePainting,
        deletePainting,
        setPaintingToUpdate,
    }), [paintings, error, loading, currentPainting, painting, getPaintingById, createOrUpdatePainting, deletePainting, setPaintingToUpdate])
  
    return (
      <PaintingContext.Provider value={value}>
        {children}
      </PaintingContext.Provider>
    );
  };