import React, { useState, useEffect , useRef} from "react";
import { __DEV } from "../isDev";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const higherOrderComponent = WrappedComponent => {


  function usePrevious(value) {    
    const ref = useRef('string');  //default value
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const HOC = props => {
    // const userDetail = useSelector(state => state.userDetail);
    // console.log(userDetail, "L10>>");

    const user_id = useSelector(state => state.userDetail)._id;
    // const prevId = usePrevious(user_id);
    let changer = 'string';
     if(user_id!==undefined&&user_id!==changer)
     {
      __DEV &&  console.log(user_id,changer,typeof user_id, typeof changer, changer===user_id,'L26>>')
       changer= user_id;
       __DEV &&  console.log('CHANGER',changer,'L27>>')
     }
     

    const initialData = {};
    const [socketC, setSocketCData] = useState(initialData);




    const useEffectDebugger = (effectHook, dependencies, dependencyNames = []) => {
      const previousDeps = usePrevious(dependencies, []);
    
      const changedDeps = dependencies.reduce((accum, dependency, index) => {
        if (dependency !== previousDeps[index]) {
          const keyName = dependencyNames[index] || index;
          return {
            ...accum,
            [keyName]: {
              before: previousDeps[index],
              after: dependency
            }
          };
        }
    
        return accum;
      }, {});
    
      if (Object.keys(changedDeps).length) {
        __DEV &&  console.log('[use-effect-debugger] ', changedDeps, Date.now());
      }
    
      useEffect(effectHook, dependencies);
    };

    useEffectDebugger(() => {
     
      let socket = null;
      console.log(user_id,'L23>>>',typeof user_id,typeof user_id==='string'&&user_id.length)
      if (user_id!==undefined) {
        __DEV &&  console.log('connecting to socket now!')
      
        socket = io.connect(process.env.REACT_APP_socketurl, {
          reconnection: true,
          query: { userId: user_id }
        });
  
        socket.on("connect", () => {
          __DEV &&  console.log("connected to lifestyle server",user_id,socket,socketC);
          __DEV &&  console.log("socket connected", socket);
          setSocketCData(socket);
        });
        socket.on('newRoom',(data)=>{
          __DEV &&  console.log(data,'L31>>')
        })
      }
      return function cleanup() {
        //unmounting
        __DEV &&   console.log('CLEANUP-socket.js',user_id)
        if (socket !== null) {
          socket.disconnect();
        }
      };
  }, [user_id],['userId','socketState']);  // cleanup is called whenever a dependency changes 

  useEffect(()=>{
    __DEV &&  console.log("SOCKET UNMOUNTING-MOUNT!") //mounting three times //not unmounting three times
                                            // so three separate instances are created! WTF!
    return ()=>{
      __DEV &&   console.log("SOCKET UNMOUNTING!")
    }
  },[])                                   // this will be called whenever a component is unmounting

    return (
      <WrappedComponent
        {...props}
        data={Object.keys(socketC).length > 0 ? socketC : null}
      />
    );
  };

  return HOC;
};

export default higherOrderComponent;
