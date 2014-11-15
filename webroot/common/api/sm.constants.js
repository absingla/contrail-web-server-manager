/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var smConstants = {};

smConstants.URL_SERVERS_DETAILS = '/server?detail';

smConstants.KEY_NAME = 'name';
smConstants.KEY_TAG = 'tag';
smConstants.KEY_STATUS = 'status';
smConstants.KEY_SERVER = 'server';
smConstants.KEY_IMAGE = 'image';
smConstants.KEY_PACKAGE = 'package';
smConstants.KEY_ID = 'id';
smConstants.KEY_CLUSTER_ID = 'cluster_id';
smConstants.KEY_FILTER_IN_NULL = 'filterInNull';
smConstants.KEY_POST_PROCESSOR = 'postProcessor';
smConstants.KEY_EMPTY_CLUSTER = '--empty--';

smConstants.FUNC_COMPUTE_SERVER_STATES = 'computeServerStates';
smConstants.FUNC_FILTER_IN_IMAGES = 'filterInImages';
smConstants.FUNC_FILTER_IN_PACKAGES = 'filterInPackages';

smConstants.REDIS_TAG_VALUES = 'tagValues';
smConstants.REDIS_CACHE_EXPIRE = 3600;

smConstants.ALLOWED_FORWARDING_PARAMS = ['id', 'tag', 'cluster_id'];
smConstants.SM_API_SERVER = 'sm_api_server'
smConstants.SM_INTROSPECT_SERVER = 'sm_introspect_server'

smConstants.IMAGE_TYPES = ['ubuntu', 'centos', 'redhat', 'esxi5.1', 'esxi5.5'];
smConstants.PACKAGE_TYPES = ['contrail-ubuntu-package', 'contrail-centos-package', 'contrail-storage-ubuntu-package'];

smConstants.REIMAGE_URL = '/server/reimage';
smConstants.PROVISON_URL = '/server/provision'
smConstants.TAG_DETAIL_URL = '/tag?detail';
smConstants.SM_IPMI_INFO_INTROSPECT_URL = '/Snh_SandeshUVECacheReq?x=SMIpmiInfo';

// Export this as a module.
module.exports = smConstants;