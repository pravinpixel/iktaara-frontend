/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from 'next-auth/react';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AuthConfig } from 'src/configs/auth';
import { v4 as uuidv4 } from 'uuid';
import { axiosInstance } from '../lib/api/base';

const SiteContext = createContext({});

type Props = {
  children: ReactNode;
};

export const SiteInfoProvider = ({ children }: Props) => {
  const [siteInfo, setSiteInfo] = useState([]);
  const [allMenus, setAllMenus] = useState([]);
  const [menus, setMenus] = useState([]);
  const [Uuid, setUuid] = useState<string | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const getUuid = async () => {
      let uuid: string | null = null;
      uuid = (await window.localStorage.getItem(AuthConfig.uuid)) || null;
      if (uuid == null) {
        window.localStorage.setItem(AuthConfig.uuid, uuidv4());
      }
      setUuid(uuid);
    };
    getUuid();

    if (status == 'authenticated') {
      const setSessions = async () => {
        const u = session as unknown as any;
        if (u && u?.user.user_id) {
          await window.localStorage.setItem(
            AuthConfig.tokenName,
            u?.user.token,
          );
          //await window.localStorage.setItem('user', JSON.stringify(u?.user.user));
        }
      };
      setSessions();
    }

    const fetchInfo = async () => {
      await axiosInstance()
        .get('/api/get/site/info')
        .then((res: any) => {
          if (res.status == 200) {
            /* window.localStorage.setItem(
              AuthConfig.siteInfo,
              JSON.stringify(res.data?.data),
            ); */
            setSiteInfo(res.data?.data);
          }
        });
    };
    fetchInfo();
    const fetchAllMenus = async () => {
      /* const localAllMenus: any =
        (await window.localStorage.getItem(AuthConfig.allMenus)) || [];
      if (localAllMenus.length >= 1) {
        setAllMenus(JSON.parse(localAllMenus));
      } else {*/
      await axiosInstance()
        .get('/api/get/allMenu')
        .then((res: any) => {
          if (res.status == 200) {
            window.localStorage.setItem(
              AuthConfig.allMenus,
              JSON.stringify(res.data?.data),
            );
            setAllMenus(res.data?.data);
          }
        });
      //}
    };
    fetchAllMenus();
    const fetchMenus = async () => {
      /*  const localMenu: any =
        (await window.localStorage.getItem(AuthConfig.menus)) || [];
      if (localMenu.length >= 1) {
        setMenus(JSON.parse(localMenu));
      } else { */
      await axiosInstance()
        .get('/api/get/topMenu')
        .then((res: any) => {
          if (res.status == 200) {
            /* window.localStorage.setItem(
                AuthConfig.menus,
                JSON.stringify(res.data?.data),
              ); */
            setMenus(res.data?.data);
          }
        });
      //}
    };
    fetchMenus();
  }, [status]);

  const values = {
    siteInfo,
    allMenus,
    menus,
    Uuid,
  };
  return (
    <SiteContext.Provider value={values}>{children} </SiteContext.Provider>
  );
};

export const useSiteInfo = () => useContext(SiteContext);
