const blockQueue = require('block-queue');

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subfeed = sequelize.define('Subfeed', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    params: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Subfeed.belongsTo(models.Feed);
      },

      findPluginsFromFeeds: function(feeds, Feed, Plugin) {
        const feedIds = feeds.map(feed => {
          return feed.id;
        });
        // console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
        let subfeeds = Subfeed.findAll({
          where: { feedId: { in: feedIds }},
          include: [
            { model: Feed, attributes: ['pluginId'], include: [
              { model: Plugin, attributes: ['path'] }
            ]}
          ]
        });
        return subfeeds;
      }
    },

    instanceMethods: {
      createNewSubfeedPlugin: function(subfeedPlugins, makeNewBlockQueue) {
        const plugin = this.Feed.Plugin;
        const SubfeedPlugin =
          require(`../plugins/${ plugin.path }/backend.js`);

        const queue = makeNewBlockQueue(this.id);
        const pluginInstance = new SubfeedPlugin(this.params);
        subfeedPlugins[this.id] = pluginInstance;
        pluginInstance.getNewerData(queue);
      }
    }
  });
  return Subfeed;
};
