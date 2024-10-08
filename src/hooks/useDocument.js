import React, { useEffect, useState } from 'react';
import { useFetchAPIData } from './common';
import { getDocList } from '../api/project';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { Platform } from 'react-native';
import { showToast } from '../utility/methods/other';

export const useDocument = ({ route }) => {
  const [documentList, setDocumentList] = useState([]);
  const [getDocumentBody, setGetDocumentBody] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setGetDocumentBody({
      projectId: route.params.projectId,
    });
  }, []);

  const successCb = (type, data) => {
    switch (type) {
      case 'get': {
        setDocumentList(data.data);
        setGetDocumentBody({});
      }
    }
  };

  const getFileName = url => {
    return url.split('/').pop().split('.')[0];
  };

  const handleDocumentOpen = url => {
    try {
      setLoading(true);
      const extension = getFileName(url);

      const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

      const options = {
        fromUrl: url,
        toFile: localFile,
      };
      RNFS.downloadFile(options)
        .promise.then(() =>
          FileViewer.open(localFile, {
            showOpenWithDialog: true,
            showAppsSuggestions: true,
          }),
        )
        .then(res => {
          // success
          setLoading(false);
        })
        .catch(error => {
          // error
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      showToast('Oops,something went wrong');
    }
  };

  const [{ isLoading }] = useFetchAPIData({
    apiCallCondition: Object.keys(getDocumentBody).length,
    apiParams: getDocumentBody,
    apiFunction: getDocList,
    accessPath: ['data'],
    dependencyArray: [getDocumentBody],
    successCb: data => successCb('get', data),
    failureCb: e => console.log(e),
  });

  return [
    {
      documentList,
      isLoading,
      loading,
    },
    { handleDocumentOpen },
  ];
};
