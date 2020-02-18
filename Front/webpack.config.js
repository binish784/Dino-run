const path=require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports={
    entry:"./src/index.js",
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"index_bundle.js"
    },
    module:{
        rules:[
            {
                test:/\.(js)$/,
                loader: 'babel-loader',
                options: {  
                    presets: [ "@babel/preset-env", "@babel/preset-react" ],
                    plugins: ['transform-class-properties']
                }
            },
            {test:/\.(css)$/,use:['style-loader','css-loader']},
            {test:/\.(png)$/,use:'file-loader'},
        ]
    },
    mode:"development",
    plugins:[
        new HtmlWebpackPlugin({
            template:"src/index.html"
        })
    ]    
}

