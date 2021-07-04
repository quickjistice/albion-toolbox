
// нашел на одном из сайтов
var shopFee = 0;
if (subcategory == 'potion')
    shopFee = Math.ceil(usageBase * runs * (fee / 100));
else if (subcategory == 'cooked')
    shopFee = Math.ceil(usageBase * 0.5 * runs * (fee / 100));