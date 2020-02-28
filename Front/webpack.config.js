const path=require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports={
    entry:['@babel/polyfill', './src/index.js'],
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"index_bundle.js"
    },
    module:{
        rules:[
            {
                test:[/\.(js|jsx)$/],
                loader: 'babel-loader',
                options: {  
                    presets: [[
                    "@babel/preset-env", {
                      "useBuiltIns": "entry"
                    }],
                    "@babel/preset-react"],
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
    ],
    devServer:{
        historyApiFallback:true,    
        open:true,
    }
}
