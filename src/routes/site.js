const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

// [GET]
// render home
// /
router.get('/', siteController.index);

// render single post
// /mua-ban-bds/:slug
router.get('/mua-ban-bds/:slug', siteController.post);

// render index single post
// /mua-ban-bds/
router.get('/mua-ban-bds/', siteController.ipost);

// du an
// /du-an/dang-khoi-cong/:slug
router.get('/du-an/dang-khoi-cong/:slug', siteController.duan);

// Mua&Ban
// mua ban nha
// mua-ban/mua-ban-nha
router.get('/mua-ban/mua-ban-nha', siteController.mbn);

// mua nha mat pho
// mua-ban/mua-nha-mat-pho
router.get('/mua-ban/mua-nha-mat-pho', siteController.mnmp);

// mua can ho chung cu
// mua-ban/mua-can-ho-chung-cu
router.get('/mua-ban/mua-can-ho-chung-cu', siteController.mchcc);

// mua can ho villa
// mua-ban/mua-can-ho-villa
router.get('/mua-ban/mua-can-ho-villa', siteController.mchv);

// mua kho nha suong
// mua-ban/mua-kho-nha-suong
router.get('/mua-ban/mua-kho-nha-suong', siteController.mkns);

// Mua mặt bằng
// mua-ban/mua-mat-bang
router.get('/mua-ban/mua-mat-bang', siteController.mmb);

// ==Cho Thuê==
// Thuê căn hộ chung cư
// cho-thue/thue-can-ho-chung-cu
router.get('/cho-thue/thue-can-ho-chung-cu', siteController.tchcc);

// Thuê mặt bằng
// cho-thue/thue-mat-bang
router.get('/cho-thue/thue-mat-bang', siteController.tmb);

// Thuê văn phòng
// cho-thue/thue-van-phong
router.get('/cho-thue/thue-van-phong', siteController.tvp);

// Thuê nhà trọ 
// cho-thue/thue-nha-tro
router.get('/cho-thue/thue-nha-tro', siteController.tnt );

// Thuê cửa hàng 
// cho-thue/thue-cua-hang
router.get('/cho-thue/thue-cua-hang', siteController.tch);

// Thuê kho, nhà sưởng
// cho-thue/thue-kho-nha-suong
router.get('/cho-thue/thue-kho-nha-suong', siteController.tkns);


// ==Sang nhượng==
// Sang nhượng đất
// sang-nhuong/sang-nhuong-dat
router.get('/sang-nhuong/sang-nhuong-dat', siteController.snd);

// Sang nhượng nhà riêng
// sang-nhuong/sang-nhuong-nha-rieng
router.get('/sang-nhuong/sang-nhuong-nha-rieng', siteController.snnr);

// Sang nhượng căn hộ chung cư
// sang-nhuong/sang-nhuong-can-ho-chung-cu
router.get('/sang-nhuong/sang-nhuong-can-ho-chung-cu', siteController.snchcc);

// Sang nhượng cửa hàng 
// sang-nhuong/sang-nhuong-cua-hang
router.get('/sang-nhuong/sang-nhuong-cua-hang', siteController.snch);

// ==Thổ cư==
// Mua bán đất 
// tho-cu/mua-ban-dat
router.get('/tho-cu/mua-ban-dat', siteController.mbd);

// Đất cho thuê 
// tho-cu/dat-cho-thue
router.get('/tho-cu/dat-cho-thue', siteController.dct);

// Đất thổ cư
// tho-cu/dat-tho-cu
router.get('/tho-cu/dat-tho-cu', siteController.dtc);

// Đất nền dự án 
// tho-cu/dat-nen-du-an
router.get('/tho-cu/dat-nen-du-an', siteController.dnda);

// Đất canh tác
// tho-cu/dat-canh-tac
router.get('/tho-cu/dat-canh-tac', siteController.dctt);

// ==Danh bạ==
// Nhà môi giới
// danh-ba/nha-moi-gioi
router.get('/danh-ba/nha-moi-gioi', siteController.nmg);

// Doanh nghiệp
// danh-ba/doanh-nghiep
router.get('/danh-ba/doanh-nghiep', siteController.dn);

// render not found
// /404
router.get('/404', siteController.error);

module.exports = router;