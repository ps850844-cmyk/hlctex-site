# HLC 新网站 Git 自动部署说明

这个文件夹是新版 `hlctex.com` 网站。  
目标是以后不要再上传 zip，而是用 Git 更新网站。

## 推荐方式

使用：

- GitHub，适合海外访问和长期 SEO 项目；
- 或 Gitee，国内访问更顺。

如果你的首要客户是国外，建议用 GitHub。

## 第一步：把本地网站放进 Git 仓库

如果你电脑还没安装 Git，可以先安装其中一个：

- Git for Windows
- GitHub Desktop
- Gitee 客户端

安装后，在 `hlc-new-site` 文件夹里初始化仓库：

```bash
git init
git add .
git commit -m "Initial clean HLC static website"
```

然后在 GitHub 或 Gitee 新建一个仓库，例如：

```text
hlctex-site
```

再绑定远程仓库：

```bash
git branch -M main
git remote add origin https://github.com/YOUR_NAME/hlctex-site.git
git push -u origin main
```

## 第二步：阿里云第一次部署

在阿里云服务器执行：

```bash
cd ~
git clone https://github.com/YOUR_NAME/hlctex-site.git hlctex-site
cd hlctex-site/deploy
bash aliyun-git-deploy.sh https://github.com/YOUR_NAME/hlctex-site.git
```

如果你要切换成静态网站 Nginx 配置，把本仓库里的配置复制到服务器：

```bash
sudo cp /var/www/hlc/deploy/nginx-hlc-static.conf /etc/nginx/sites-available/hlc
sudo ln -sfn /etc/nginx/sites-available/hlc /etc/nginx/sites-enabled/hlc
sudo nginx -t
sudo systemctl reload nginx
```

注意：这个配置会继续使用原来的 SSL 证书：

```text
/etc/letsencrypt/live/hlctex.com/fullchain.pem
/etc/letsencrypt/live/hlctex.com/privkey.pem
```

不要删除 `/etc/letsencrypt/`。

## 第三步：以后如何更新

以后 Codex 或你本地修改网站后：

```bash
git add .
git commit -m "Update HLC website"
git push
```

然后在阿里云服务器执行：

```bash
cd /var/www/hlc
git pull
sudo nginx -t
sudo systemctl reload nginx
```

网站就更新了。

## 回滚

如果更新后发现不好，可以回到上一版：

```bash
cd /var/www/hlc
git log --oneline
git checkout 上一个版本号
sudo systemctl reload nginx
```

## 重要提醒

不要清空这些目录：

```text
/etc/letsencrypt/
/etc/nginx/
```

可以替换的是：

```text
/var/www/hlc
```

