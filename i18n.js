// Multi-language internationalization (i18n) module for Apartment Hunt
// Supports English ('en'), Traditional Chinese ('zh-HK'), and Simplified Chinese ('zh-CN').

(() => {
  "use strict";

  const STORAGE_KEY = "aptHunt.lang";
  const DEFAULT_LANG = "zh-HK"; // Default to Traditional Chinese for Hong Kong context, or respects user selection

  const TRANSLATIONS = {
    // Top bar & navigation
    "app.title": {
      "en": "Apartment Hunt",
      "zh-HK": "香港租屋指南",
      "zh-CN": "香港租房指南"
    },
    "nav.photos": {
      "en": "Photos",
      "zh-HK": "單位相片",
      "zh-CN": "房源照片"
    },
    "nav.plan": {
      "en": "Floor plan",
      "zh-HK": "平面圖 & 3D",
      "zh-CN": "平面图 & 3D"
    },
    "nav.compare": {
      "en": "Compare",
      "zh-HK": "多維對比",
      "zh-CN": "多维对比"
    },

    // Sidebar
    "sidebar.title": {
      "en": "Apartments",
      "zh-HK": "精選樓盤",
      "zh-CN": "精选楼盘"
    },
    "sidebar.add": {
      "en": "+ Add",
      "zh-HK": "+ 新增樓盤",
      "zh-CN": "+ 新增房源"
    },
    "sidebar.showRuledOut": {
      "en": "Show ruled out",
      "zh-HK": "顯示已排除",
      "zh-CN": "显示已排除"
    },
    "sidebar.hint": {
      "en": "To add or rule out apartments, edit apartments.js or click + Add.",
      "zh-HK": "可於 apartments.js 編輯樓盤資料，或點擊「+ 新增樓盤」。",
      "zh-CN": "可于 apartments.js 编辑房源资料，或点击“+ 新增房源”。"
    },
    "sidebar.ruledOutTag": {
      "en": "ruled out",
      "zh-HK": "已排除",
      "zh-CN": "已排除"
    },
    "sidebar.empty": {
      "en": "No apartments enabled.",
      "zh-HK": "暫無啟用的樓盤。",
      "zh-CN": "暂无启用的房源。"
    },

    // Photos tab
    "photos.rent": {
      "en": "Rent",
      "zh-HK": "月租",
      "zh-CN": "月租"
    },
    "photos.beds": {
      "en": "Beds",
      "zh-HK": "臥室",
      "zh-CN": "卧室"
    },
    "photos.baths": {
      "en": "Baths",
      "zh-HK": "浴室",
      "zh-CN": "浴室"
    },
    "photos.size": {
      "en": "Size",
      "zh-HK": "實用面積",
      "zh-CN": "实用面积"
    },
    "photos.available": {
      "en": "Available",
      "zh-HK": "起租期",
      "zh-CN": "起租期"
    },
    "photos.openListing": {
      "en": "Open listing ↗",
      "zh-HK": "前往地產官網查看 ↗",
      "zh-CN": "前往房源官网查看 ↗"
    },
    "photos.noPhotos": {
      "en": "No photos yet for this apartment.",
      "zh-HK": "此樓盤暫無相片展示。",
      "zh-CN": "此房源暂无照片展示。"
    },

    // Floor plan planner
    "planner.layouts": {
      "en": "Layouts",
      "zh-HK": "預設佈局",
      "zh-CN": "预设布局"
    },
    "planner.packs": {
      "en": "Furniture Packs",
      "zh-HK": "一鍵家具套裝",
      "zh-CN": "一键家具套装"
    },
    "planner.packWfh": {
      "en": "💼 WFH Setup",
      "zh-HK": "💼 居家辦公套裝",
      "zh-CN": "💼 居家办公套装"
    },
    "planner.packWfhDesc": {
      "en": "Desk, Chair, Shelf & Lamp",
      "zh-HK": "辦公桌、工學椅、書架及落地燈",
      "zh-CN": "办公桌、工学椅、书架及落地灯"
    },
    "planner.packLiving": {
      "en": "🛋️ Living Room",
      "zh-HK": "🛋️ 客廳休閒套裝",
      "zh-CN": "🛋️ 客厅休闲套装"
    },
    "planner.packLivingDesc": {
      "en": "Sofa, Coffee Table, TV & Rug",
      "zh-HK": "三人沙發、茶几、電視櫃及地毯",
      "zh-CN": "三人沙发、茶几、电视柜及地毯"
    },
    "planner.packBedroom": {
      "en": "🛏️ Queen Bedroom",
      "zh-HK": "🛏️ 標準雙人臥室",
      "zh-CN": "🛏️ 标准双人卧室"
    },
    "planner.packBedroomDesc": {
      "en": "Bed, 2 Nightstands & Wardrobe",
      "zh-HK": "雙人床、2個床頭櫃及大衣櫃",
      "zh-CN": "双人床、2个床头柜及大衣柜"
    },
    "planner.addFurniture": {
      "en": "Add furniture",
      "zh-HK": "添加單件家具",
      "zh-CN": "添加单件家具"
    },
    "planner.customSize": {
      "en": "Custom size",
      "zh-HK": "自訂尺寸家具",
      "zh-CN": "自定义尺寸家具"
    },
    "planner.customName": {
      "en": "Name, e.g. our sofa",
      "zh-HK": "家具名稱，如我的沙發",
      "zh-CN": "家具名称，如我的沙发"
    },
    "planner.customW": {
      "en": "Width, e.g. 220",
      "zh-HK": "寬度 (cm)，如 220",
      "zh-CN": "宽度 (cm)，如 220"
    },
    "planner.customD": {
      "en": "Depth, e.g. 95",
      "zh-HK": "深度 (cm)，如 95",
      "zh-CN": "深度 (cm)，如 95"
    },
    "planner.addPiece": {
      "en": "Add piece",
      "zh-HK": "放置家具",
      "zh-CN": "放置家具"
    },
    "planner.save": {
      "en": "Save & Sync",
      "zh-HK": "儲存與匯出",
      "zh-CN": "保存与导出"
    },
    "planner.saveNote": {
      "en": "Saved in this browser. Export to keep it in the repo or move it to another device.",
      "zh-HK": "已自動儲存於瀏覽器。可匯出 JSON 備份或分享至其他裝置。",
      "zh-CN": "已自动保存于浏览器。可导出 JSON 备份或同步至其他设备。"
    },
    "planner.export": {
      "en": "Export",
      "zh-HK": "匯出佈局",
      "zh-CN": "导出布局"
    },
    "planner.import": {
      "en": "Import",
      "zh-HK": "匯入佈局",
      "zh-CN": "导入布局"
    },
    "planner.clear": {
      "en": "Clear furniture",
      "zh-HK": "清空家具",
      "zh-CN": "清空家具"
    },
    "planner.v2d": {
      "en": "Plan",
      "zh-HK": "2D 平面",
      "zh-CN": "2D 平面"
    },
    "planner.v3d": {
      "en": "3D",
      "zh-HK": "3D 立體",
      "zh-CN": "3D 立体"
    },
    "planner.cOrbit": {
      "en": "Orbit",
      "zh-HK": "全景環視",
      "zh-CN": "全景环视"
    },
    "planner.cFps": {
      "en": "Walkthrough",
      "zh-HK": "室內漫步",
      "zh-CN": "室内漫游"
    },
    "planner.mMove": {
      "en": "Move",
      "zh-HK": "移動",
      "zh-CN": "移动"
    },
    "planner.mMeasure": {
      "en": "Measure",
      "zh-HK": "測距",
      "zh-CN": "测距"
    },
    "planner.mCalibrate": {
      "en": "Set scale",
      "zh-HK": "校準比例",
      "zh-CN": "校准比例"
    },
    "planner.zFit": {
      "en": "Fit",
      "zh-HK": "置中",
      "zh-CN": "居中"
    },
    "planner.listingOverlay": {
      "en": "Listing plan overlay",
      "zh-HK": "疊加原樓盤圖則",
      "zh-CN": "叠加原楼盘图纸"
    },
    "planner.sizes": {
      "en": "Sizes",
      "zh-HK": "顯示尺寸",
      "zh-CN": "显示尺寸"
    },
    "planner.fpsHelp": {
      "en": "🖱️ Drag mouse forward/back to walk · Drag left/right to steer · Click floor to move · Scroll wheel to walk",
      "zh-HK": "🖱️ 滑鼠前後拖曳前進/後退 · 左右拖曳轉向 · 點擊地面瞬移 · 滾輪前後移動",
      "zh-CN": "🖱️ 鼠标前后拖拽前进/后退 · 左右拖拽转向 · 点击地面瞬移 · 滚轮前后移动"
    },
    "planner.fpsNote": {
      "en": "3D Mode: Switch between Orbit and First-Person Walkthrough.",
      "zh-HK": "3D 模式：支援全景環視與第一人稱沉浸式室內漫步。",
      "zh-CN": "3D 模式：支持全景环视与第一人称沉浸式室内漫游。"
    },

    // Furniture catalogue groups
    "cat.Bedroom": { "en": "Bedroom", "zh-HK": "臥室", "zh-CN": "卧室" },
    "cat.Living": { "en": "Living", "zh-HK": "客廳", "zh-CN": "客厅" },
    "cat.Dining & work": { "en": "Dining & work", "zh-HK": "餐廳與工作", "zh-CN": "餐厅与办公" },
    "cat.Extras": { "en": "Extras", "zh-HK": "家電與配件", "zh-CN": "家电与配件" },

    // Furniture pieces
    "furn.bed-king": { "en": "King bed", "zh-HK": "特大雙人床 (King)", "zh-CN": "特大双人床 (King)" },
    "furn.bed-queen": { "en": "Queen bed", "zh-HK": "標準雙人床 (Queen)", "zh-CN": "标准双人床 (Queen)" },
    "furn.bed-double": { "en": "Double bed", "zh-HK": "雙人床 (Double)", "zh-CN": "双人床 (Double)" },
    "furn.bed-single": { "en": "Single bed", "zh-HK": "單人床", "zh-CN": "单人床" },
    "furn.nightstand": { "en": "Bedside table", "zh-HK": "床頭櫃", "zh-CN": "床头柜" },
    "furn.wardrobe": { "en": "Wardrobe", "zh-HK": "大衣櫃", "zh-CN": "大衣柜" },
    "furn.dresser": { "en": "Chest of drawers", "zh-HK": "五斗櫃/抽屜櫃", "zh-CN": "五斗柜/抽屉柜" },
    "furn.sofa3": { "en": "3-seat sofa", "zh-HK": "三人沙發", "zh-CN": "三人沙发" },
    "furn.sofa2": { "en": "2-seat sofa", "zh-HK": "雙人沙發", "zh-CN": "双人沙发" },
    "furn.sectional": { "en": "L-sofa", "zh-HK": "L型轉角沙發", "zh-CN": "L型转角沙发" },
    "furn.sofabed": { "en": "Sofa bed", "zh-HK": "沙發床", "zh-CN": "沙发床" },
    "furn.armchair": { "en": "Armchair", "zh-HK": "單人扶手椅", "zh-CN": "单人扶手椅" },
    "furn.coffee": { "en": "Coffee table", "zh-HK": "客廳茶几", "zh-CN": "客厅茶几" },
    "furn.tv": { "en": "TV unit", "zh-HK": "電視地櫃", "zh-CN": "电视地柜" },
    "furn.rug": { "en": "Rug", "zh-HK": "客廳地毯", "zh-CN": "客厅地毯" },
    "furn.bookshelf": { "en": "Bookshelf", "zh-HK": "開放式書架", "zh-CN": "开放式书架" },
    "furn.dining4": { "en": "Dining table (4)", "zh-HK": "四人餐桌", "zh-CN": "四人餐桌" },
    "furn.dining6": { "en": "Dining table (6)", "zh-HK": "六人餐桌", "zh-CN": "六人餐桌" },
    "furn.round": { "en": "Round table", "zh-HK": "圓形餐桌", "zh-CN": "圆形餐桌" },
    "furn.chair": { "en": "Dining chair", "zh-HK": "餐椅", "zh-CN": "餐椅" },
    "furn.bench": { "en": "Bench", "zh-HK": "長凳", "zh-CN": "长凳" },
    "furn.desk": { "en": "Desk", "zh-HK": "工作書桌", "zh-CN": "工作书桌" },
    "furn.officechair": { "en": "Desk chair", "zh-HK": "辦公工學椅", "zh-CN": "办公工学椅" },
    "furn.shoe": { "en": "Shoe cabinet", "zh-HK": "玄關鞋櫃", "zh-CN": "玄关鞋柜" },
    "furn.plant": { "en": "Plant", "zh-HK": "室內綠植盆栽", "zh-CN": "室内绿植盆栽" },
    "furn.lamp": { "en": "Floor lamp", "zh-HK": "落地立燈", "zh-CN": "落地立灯" },
    "furn.washer": { "en": "Washer / dryer", "zh-HK": "洗衣乾衣機", "zh-CN": "洗衣烘干机" },
    "furn.box": { "en": "Custom piece", "zh-HK": "自訂尺寸家具", "zh-CN": "自定义尺寸家具" },

    // Compare tab
    "compare.selectTitle": {
      "en": "Select Properties to Compare",
      "zh-HK": "自選對比樓盤",
      "zh-CN": "自选对比房源"
    },
    "compare.selectDesc": {
      "en": "Choose which apartments to include in the side-by-side comparison matrix and floor plan line-up.",
      "zh-HK": "自選欲納入同屏橫向對比及圖則展示的物業單位。",
      "zh-CN": "自选欲纳入同屏横向对比及户型展示的物业单位。"
    },
    "compare.selectAll": {
      "en": "Select All",
      "zh-HK": "全選",
      "zh-CN": "全选"
    },
    "compare.clearAll": {
      "en": "Deselect All",
      "zh-HK": "清空",
      "zh-CN": "清空"
    },
    "compare.selectedCount": {
      "en": "selected",
      "zh-HK": "個已選",
      "zh-CN": "个已选"
    },
    "compare.emptySelectionTitle": {
      "en": "No apartments selected for comparison",
      "zh-HK": "尚未勾選任何對比樓盤",
      "zh-CN": "尚未勾选任何对比房源"
    },
    "compare.emptySelectionHint": {
      "en": "Click on one or more property badges above to compare them side-by-side.",
      "zh-HK": "請點擊上方樓盤標籤選取至少一個物業進行多維對比。",
      "zh-CN": "请点击上方房源标签选取至少一个物业进行多维对比。"
    },
    "compare.title": {
      "en": "Interactive Scorecard Weighting",
      "zh-HK": "智能多維評分加權系統",
      "zh-CN": "智能多维评分加权系统"
    },
    "compare.desc": {
      "en": "Adjust priority sliders to dynamically re-score and rank candidate apartments in real-time.",
      "zh-HK": "拖曳權重滑桿，即可依個人偏好即時重新計算綜合匹配得分與排名。",
      "zh-CN": "拖曳权重滑块，即可根据个人偏好即时重新计算综合匹配得分与排名。"
    },
    "compare.reset": {
      "en": "Reset Weights",
      "zh-HK": "重設權重",
      "zh-CN": "重置权重"
    },
    "compare.wBudget": {
      "en": "💰 Budget / Rent",
      "zh-HK": "💰 月租與前期預算",
      "zh-CN": "💰 月租与前期预算"
    },
    "compare.wBudgetDesc": {
      "en": "Prioritizes lower monthly rent and upfront moving cash",
      "zh-HK": "偏好較低月租金及較少的前期入住開銷",
      "zh-CN": "偏好较低月租金及较少的前期入住开销"
    },
    "compare.wTransit": {
      "en": "🚇 Commute & Transit",
      "zh-HK": "🚇 通勤與港鐵交通",
      "zh-CN": "🚇 通勤与地铁交通"
    },
    "compare.wTransitDesc": {
      "en": "Door-to-door transit minutes to Central (Landmark) & Jardine's Lookout",
      "zh-HK": "直達中環置地廣場及渣甸山家人住處的交通時間",
      "zh-CN": "直达中环置地广场及渣甸山家人住处的交通时间"
    },
    "compare.wSpace": {
      "en": "📐 Living Space / Size",
      "zh-HK": "📐 實用居住空間",
      "zh-CN": "📐 实用居住空间"
    },
    "compare.wSpaceDesc": {
      "en": "Emphasizes larger saleable square footage",
      "zh-HK": "重視較大的室內實用面積與空間感",
      "zh-CN": "重视较大的室内实用面积与空间感"
    },
    "compare.rank1": {
      "en": "🥇 #1 Match",
      "zh-HK": "🥇 首選推薦",
      "zh-CN": "🥇 首选推荐"
    },
    "compare.rank2": {
      "en": "🥈 #2 Match",
      "zh-HK": "🥈 次選推薦",
      "zh-CN": "🥈 次选推荐"
    },
    "compare.rank3": {
      "en": "🥉 #3 Match",
      "zh-HK": "🥉 第三推薦",
      "zh-CN": "🥉 第三推荐"
    },

    // Compare table rows
    "row.rank": { "en": "Match Rank", "zh-HK": "綜合匹配排名", "zh-CN": "综合匹配排名" },
    "row.composite": { "en": "Composite Score", "zh-HK": "多維綜合得分", "zh-CN": "多维综合得分" },
    "row.photo": { "en": "Photo", "zh-HK": "外觀/客廳", "zh-CN": "外观/客厅" },
    "row.rent": { "en": "Rent", "zh-HK": "每月租金", "zh-CN": "每月租金" },
    "row.rentRange": { "en": "Rent ±10%", "zh-HK": "議價參考區間 (±10%)", "zh-CN": "议价参考区间 (±10%)" },
    "row.fees": { "en": "Fees", "zh-HK": "管理費及差餉", "zh-CN": "管理费及差饷" },
    "row.allIn": { "en": "All-in / month", "zh-HK": "全包每月實質支出", "zh-CN": "全包每月实质支出" },
    "row.bedsBaths": { "en": "Beds / baths", "zh-HK": "房間及浴室間隔", "zh-CN": "房间及浴室间隔" },
    "row.size": { "en": "Size", "zh-HK": "實用面積", "zh-CN": "实用面积" },
    "row.building": { "en": "Building", "zh-HK": "物業名稱 / 樓齡", "zh-CN": "物业名称 / 楼龄" },
    "row.floor": { "en": "Floor", "zh-HK": "所在樓層", "zh-CN": "所在楼层" },
    "row.perSqft": { "en": "Per sq ft", "zh-HK": "實用呎租", "zh-CN": "实用呎租" },
    "row.available": { "en": "Available", "zh-HK": "起租日期", "zh-CN": "起租日期" },

    // Financial section
    "sec.financials": {
      "en": "Financials & Total Cost of Occupancy (HK)",
      "zh-HK": "香港租賃財務試算 & 首年居住總成本 (TCO)",
      "zh-CN": "香港租赁财务试算 & 首年居住总成本 (TCO)"
    },
    "row.upfront": {
      "en": "Upfront cash required",
      "zh-HK": "入住前首期應備資金",
      "zh-CN": "入住前首期应备资金"
    },
    "row.tco": {
      "en": "1st Year Total Outlay (TCO)",
      "zh-HK": "首年全期總開銷 (TCO)",
      "zh-CN": "首年全期总开销 (TCO)"
    },

    // Transport section
    "sec.transport": {
      "en": "Transport (estimates)",
      "zh-HK": "通勤交通與港鐵時間 (預估)",
      "zh-CN": "通勤交通与地铁时间 (预估)"
    },
    "row.transScore": {
      "en": "Transport score",
      "zh-HK": "交通通達度得分",
      "zh-CN": "交通通达度得分"
    },
    "row.mtr": {
      "en": "MTR",
      "zh-HK": "鄰近港鐵站",
      "zh-CN": "邻近港铁站"
    },
    "row.bus": {
      "en": "Bus / minibus",
      "zh-HK": "巴士 / 小巴線路",
      "zh-CN": "巴士 / 小巴线路"
    },
    "dest.work": {
      "en": "Work: The Landmark, Central",
      "zh-HK": "工作：中環置地廣場 (Landmark)",
      "zh-CN": "工作：中环置地广场 (Landmark)"
    },
    "dest.parents": {
      "en": "Parents: Flora Garden",
      "zh-HK": "家人：渣甸山春暉花園 (Flora Garden)",
      "zh-CN": "家人：渣甸山春晖花园 (Flora Garden)"
    },
    "compare.scaleTitle": {
      "en": "Floor plans at the same scale",
      "zh-HK": "等比例圖則同屏對比",
      "zh-CN": "等比例户型图同屏对比"
    },
    "compare.scaleHint": {
      "en": "Every plan below is drawn at the same scale with its furniture, so sizes compare directly.",
      "zh-HK": "下方所有單位圖則均採用完全相同比例渲染，真實室內空間與家具大小一目了然。",
      "zh-CN": "下方所有房源户型均采用完全相同比例渲染，真实室内空间与家具大小一目了然。"
    },

    // Add dialog
    "dlg.addTitle": {
      "en": "Add / Import Apartment Listing",
      "zh-HK": "新增 / 匯入租盤資料",
      "zh-CN": "新增 / 导入租房资料"
    },
    "dlg.addHint": {
      "en": "Add a new rental listing to compare immediately. It saves to your browser and can be exported.",
      "zh-HK": "新增房源將自動加入清單並參與智能評分對比，儲存於瀏覽器並可隨時匯出備份。",
      "zh-CN": "新增房源将自动加入列表并参与智能评分对比，保存于浏览器并可随时导出备份。"
    },
    "dlg.name": { "en": "Apartment Name *", "zh-HK": "樓盤名稱 *", "zh-CN": "楼盘名称 *" },
    "dlg.building": { "en": "Building Name", "zh-HK": "物業/大廈名稱", "zh-CN": "物业/大厦名称" },
    "dlg.address": { "en": "District / Address *", "zh-HK": "地區及街道地址 *", "zh-CN": "地区及街道地址 *" },
    "dlg.rent": { "en": "Monthly Rent (HK$) *", "zh-HK": "月租金 (HK$) *", "zh-CN": "月租金 (HK$) *" },
    "dlg.fees": { "en": "Management Fees", "zh-HK": "管理費 / 差餉", "zh-CN": "管理费 / 差饷" },
    "dlg.sqft": { "en": "Saleable Sq Ft", "zh-HK": "實用面積 (呎)", "zh-CN": "实用面积 (呎)" },
    "dlg.beds": { "en": "Bedrooms", "zh-HK": "房間數 (房)", "zh-CN": "房间数 (房)" },
    "dlg.baths": { "en": "Bathrooms", "zh-HK": "浴室數 (衛)", "zh-CN": "浴室数 (卫)" },
    "dlg.mtr": { "en": "Nearest MTR & Walk (min)", "zh-HK": "最近港鐵站及步行分鐘", "zh-CN": "最近港铁站及步行分钟" },
    "dlg.url": { "en": "Listing URL (28Hse, etc.)", "zh-HK": "地產網址 (28Hse/中原/美聯等)", "zh-CN": "房源网址 (28Hse/中原/美联等)" },
    "dlg.photos": { "en": "Photo URLs (comma-separated or one per line)", "zh-HK": "相片網址 (以逗號或換行分隔)", "zh-CN": "照片网址 (以逗号或换行分隔)" },
    "dlg.floorplan": { "en": "Floor Plan Image URL", "zh-HK": "平面圖圖片網址", "zh-CN": "平面图图片网址" },
    "dlg.notes": { "en": "Notes / Highlights", "zh-HK": "特色備註 / 優缺點", "zh-CN": "特色备注 / 优缺点" },
    "dlg.submit": { "en": "Add Listing", "zh-HK": "確認新增", "zh-CN": "确认新增" },
    "dlg.cancel": { "en": "Cancel", "zh-HK": "取消", "zh-CN": "取消" }
  };

  let currentLang = (() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    } catch {
      return DEFAULT_LANG;
    }
  })();

  const listeners = [];

  function getLang() {
    return currentLang;
  }

  function setLang(lang) {
    if (!["en", "zh-HK", "zh-CN"].includes(lang)) return;
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
    document.documentElement.lang = lang === "zh-HK" ? "zh-Hant" : lang === "zh-CN" ? "zh-Hans" : "en";
    listeners.forEach((fn) => {
      try { fn(lang); } catch (e) { console.error(e); }
    });
  }

  function t(key, fallback = "") {
    const entry = TRANSLATIONS[key];
    if (!entry) return fallback || key;
    return entry[currentLang] || entry["zh-HK"] || entry["en"] || fallback || key;
  }

  function onLangChange(fn) {
    if (typeof fn === "function") listeners.push(fn);
  }

  // Helper for localized apartment string field
  function aptField(apt, field) {
    if (!apt) return "";
    const lang = currentLang;
    if (lang === "zh-HK") return apt[field + "_zh"] || apt[field] || "";
    if (lang === "zh-CN") return apt[field + "_cn"] || apt[field + "_zh"] || apt[field] || "";
    return apt[field] || apt[field + "_zh"] || "";
  }

  window.I18N = {
    getLang,
    setLang,
    t,
    onLangChange,
    aptField,
    TRANSLATIONS
  };
})();
