<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>디지털산업협회</title>
<%@ include file="/WEB-INF/include/admin/css.jsp"%>
<link rel="stylesheet" type="text/css" href="/css/main/main.css">
<link href="/css/admin/input_file_design.css" rel="stylesheet">
<script src="/boot/vendor/jquery/jquery.min.js"></script>
<script src="/js/admin/fileUpload.js"></script>
<c:if test="${!empty no && no != '1'}">
	<c:set var='menu' value="update" />
</c:if>
<c:if test="${no !='1'}">
	<script>
		function checkForm() {
			var reg = /^[0-9]{1,9}$/g;
			var order = $('#order').val();
			var mode = '${menu}';

			if (!reg.test(order)) {
				alert('정렬은 숫자만 입력가능하며 최대 9자리입니다');
				$('#order').focus();
				return false;
			} else {
				if (mode == 'update') {
					if (!confirm('수정 하시겠습니까?')) {
						return false;
					}
				} else {
					if (!confirm('저장 하시겠습니까?')) {
						return false;
					}
				}
			}
		}
	</script>
</c:if>
<c:if test="${no =='1'}">
	<script>
		function checkForm() {
			if (!confirm('수정 하시겠습니까?')) {
				return false;
			}
		}
	</script>
</c:if>
</head>
<body id="page-top">
	<%@ include file="/WEB-INF/include/admin/header.jsp"%>
	<div id="wrapper">
		<%@ include file="/WEB-INF/include/admin/subNav.jsp"%>
		<div id="content-wrapper">
			<div class="container-fluid">
				<ol class="breadcrumb">
					<li class="breadcrumb-item">ADMIN &gt; ${location}</li>
				</ol>

				<div class="card mb-3" style="width: 900px; margin: 0 auto;">
					<c:choose>
						<c:when test="${empty no}">
							<c:set var="tmp" value="?mode=new" />
						</c:when>
						<c:when test="${!empty no}">
							<c:set var="tmp" value="?mode=update&no=${no}" />
						</c:when>
					</c:choose>
					<form method=post action="/admin/mbr/upload.do${tmp}" id="form1"
						enctype="multipart/form-data" onsubmit="return checkForm();">
						<div class="card-header"></div>
						<div class="card-body">
							<div class="notice_bx" style="width: 825px; margin: 0 auto;">
								<table class="detailTable" id="detailTable">
									<colgroup>
										<col width="20%">
										<col width="*">
									</colgroup>
									<tr class="lineTop">
										<th>회사명</th>
										<td><input type="text" class="form-control"
											name="mbr_name" value="${bean.getMbr_name() }" required></td>
									</tr>
									<tr>
										<th>로고</th>
										<td><div class="filebox">
												<input class="upload-name" value="${bean.getMbr_img()}"
													disabled="disabled"> <label for="input-file0">업로드</label>
												<c:choose>
													<c:when test="${empty no}">
														<input type="file" id="input-file0" class="upload-hidden"
															name="mbr_img" required />
													</c:when>
													<c:when test="${!empty no}">
														<input type="file" id="input-file0" class="upload-hidden"
															name="mbr_img" />
													</c:when>
												</c:choose>
											</div></td>
									</tr>
									<tr>
										<th>대표이사</th>
										<td><input type="text" class="form-control"
											name="mbr_ceo" value="${bean.getMbr_ceo() }" required></td>
									</tr>
									<tr>
										<th>설립일</th>
										<td><input type="text" class="form-control"
											name="mbr_estdate" value="${bean.getMbr_estdate() }"
											placeholder="ex) yyyy-mm-dd" required></td>
									</tr>
									<tr>
										<th>가입일</th>
										<td><input type="text" class="form-control"
											name="mbr_regdate" value="${bean.getMbr_regdate() }"
											placeholder="ex) yyyy-mm-dd" required></td>
									</tr>
									<tr>
										<th>전화번호</th>
										<td><input type="text" class="form-control"
											name="mbr_phone" value="${bean.getMbr_phone() }"
											placeholder="숫자만 입력" required></td>
									</tr>
									<tr>
										<th>링크</th>
										<td><input type="text" class="form-control"
											name="mbr_link" placeholder="URL입력 ( ex: kadinet.org )"
											value="${bean.getMbr_link() }" required></td>
									</tr>
									<tr class="lineBottom">
										<th>정렬</th>
										<td><input type="text" class="form-control" id="order"
											name="mbr_order" value="${bean.getMbr_order() }"
											placeholder="숫자만 입력 ,최대 9자리" required></td>
									</tr>
								</table>
							</div>
						</div>
						<div class="card-footer small text-muted">
							<c:choose>
								<c:when test="${empty no}">
									<input type="submit" id="go" class="btn btn-primary" value="저장" />
								</c:when>
								<c:when test="${!empty no}">
									<input type="submit" id="go" class="btn btn-primary" value="수정" />
								</c:when>
							</c:choose>
							<input type="button" id="list" class="btn btn-primary" value="목록"
								onclick="location.href='/admin/mbr/memberinfo.do'" />
						</div>
					</form>


				</div>
			</div>
			<%@ include file="/WEB-INF/include/admin/footer.jsp"%>
		</div>
	</div>
	<%@ include file="/WEB-INF/include/admin/logout.jsp"%>
	<%@ include file="/WEB-INF/include/admin/js.jsp"%>
</body>
</html>